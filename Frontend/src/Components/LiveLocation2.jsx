import React, { useContext, useEffect, useState, useRef } from 'react'
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps'
import { SoketServicesContext } from '../Context/soketContext'
import { CaptainDataContext } from '../Context/CaptainContext'

const LiveLocation2 = ({ isUser = true, ride = null }) => {
    const imge = {
        car: "./imges/car.png",
        bike: "./imges/bike.webp",
        auto: "./imges/auto.png"
    }
    const [captains, setCaptains] = useState([])
    const [userLocation, setUserLocation] = useState(null)
    const { sendMessage, receiveMessage,soket } = useContext(SoketServicesContext)
    const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 })
    const {captainData , setCaptainData}=useContext(CaptainDataContext)
    const mapRef = useRef(null)
    // const map = useMap()

    // Get current location
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    let location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    setCenter(location)

                    // If user, just update location
                    if (isUser) {
                        console.log(isUser)
                        setUserLocation(location)
                        // Broadcast user location only if ride is confirmed
                        if (ride) {
                            sendMessage("update-user-location", {
                                rideId: ride._id,
                                location: location
                            })
                        }
                    } else {
                        console.log(captainData)
                        // If captain, broadcast location to all users
                        sendMessage("update-location-captain", {
                            userId: captainData._id,
                            location: {
                                ltd: location.lat,
                                lng: location.lng
                            }
                        })
                    }
                },
                (error) => {
                    console.error("Error getting location:", error)
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                }
            )
        }
    }, [isUser, ride])

    // Listen for location updates
    useEffect(() => {
        if (isUser) {
            // Users receive captain locations
            soket.on("captains-locations", (data) => {
                setCaptains(data)
            })
        } else if (ride) {
            console.log(ride)
            // Captain receives user location for their assigned ride
            soket.on("user-location-update", (data) => {
                if (data.rideId === ride._id) {
                    console.log(data)
                    setUserLocation(data.location)
                }
            })
        }
    }, [isUser, ride])

    const MapContent = () => {
        const map = useMap()
        
        const centerOnLocation = () => {
            if (map) {
                map.panTo(center)
                map.setZoom(15)
            }
        }

        return (
            <>
                <button 
                    onClick={centerOnLocation}
                    className="absolute bottom-10 right-10 z-10 bg-white p-3 rounded-full shadow-lg"
                >
                    <i className="ri-focus-3-line text-xl"></i>
                </button>

                {/* Show captains for users */}
                {isUser && captains.map((captain, index) => (
                    <AdvancedMarker
                        key={index}
                        position={{ lat: captain.location.ltd, lng: captain.location.lng }}
                    >
                        <img 
                            src={imge[captain.vehicle.type]}
                            style={{width: '40px', height: '40px'}}
                            alt="Car marker"
                        />
                    </AdvancedMarker>
                ))}

                {/* Show user location for captain during ride */}
                { userLocation && (
                    <AdvancedMarker
                        position={userLocation}
                    >
                        {/* <div className="w-4 h-4 bg-[url('./imges/auto.png')] rounded-full" /> */}
                    </AdvancedMarker>
                )}
                {!isUser  && (
                    <AdvancedMarker
                        position={center}
                    >
                        
                        {/* <div className="w-4 h-4 bg-[url('./imges/auto.png')] rounded-full" /> */}
                    </AdvancedMarker>
                )}
            </>
        )
    }

    return (
        <div className='w-full h-full relative'>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map
                    defaultZoom={15}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                    defaultCenter={center}
                    className="w-full h-full rounded-lg"
                    gestureHandling={'greedy'}
                    // disableDefaultUI={false}
                >
                    <MapContent />
                </Map>
            </APIProvider>
        </div>
    )
}

export default LiveLocation2