const soketIo = require('socket.io')
const captainModel = require('./models/captain.model')
const userModel = require('./models/user.model')
const rideModel = require('./models/ride.model')


let io
module.exports.initializeSoket = (server) => {
    io = soketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    io.on("connection", (soket) => {
        console.log("client connected:", soket.id)

        soket.on('join', async (data) => {
            const { userId, userType } = data
            try {
                if (userType === "user") {
                    await userModel.findByIdAndUpdate(userId, { soketId: soket.id })
                    console.log("user soket id:",soket.id)
                }
                else if (userType === "captain") {
                    await captainModel.findByIdAndUpdate(userId, { soketId: soket.id })
                    console.log("captain soket id:",soket.id)
                }
                else {
                    throw ({ message: "user type is not defain properly" })
                }
            }
            catch (error) {
                console.log(error)
            }
        })

        soket.on("update-location-captain", async (data) => {
            const { userId, location } = data
            if (!location || !location.ltd || !location.lng) {
                return soket.emit("error", { message: "invalid location" })
            }

            try {
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                })

                // Broadcast all active captains' locations to users
                const activeCaptains = await captainModel.find({
                    status: 'inactive',
                    location: { $exists: true }
                })
                
                io.emit("captains-locations", activeCaptains)
            } catch (error) {
                console.error("Error updating captain location:", error)
            }
        })

        soket.on("update-user-location", async (data) => {
            const { rideId, location } = data
            if (!location || !location.lat || !location.lng) {
                return soket.emit("error", { message: "invalid location" })
            }

            try {
                const ride = await rideModel.findById(rideId).populate('captain')
                if (ride && ride.captain && ride.captain.soketId) {
                    // Send user location only to assigned captain
                    io.to(ride.captain.soketId).emit("user-location-update", {
                        rideId,
                        location
                    })
                }
            } catch (error) {
                console.error("Error broadcasting user location:", error)
            }
        })

        soket.on("disconnect", () => {
            console.log("client dissconnected", soket.id)
        })
    })
}

module.exports.sendMessageToSoketId = (soketId, message) => {
    if (io) {
        io.to(soketId).emit(message.event, message.data)
        console.log("message is send")
    }
    else {
        console.log("soket io is not initialized")
    }
}