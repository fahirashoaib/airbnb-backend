const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
// Static data
const listings = [
    { id: 1, title: "Beach House", location: "Miami",availability:"Dec 23-28", pricePerNight: 150,imageUrl:[
        "https://a0.muscache.com/im/pictures/fa0dbacc-58e1-45ae-be91-da046333b08c.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/138fdd64-f12a-437d-8263-cdc99c3ba52f.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/c3654be0-fcc6-4dc5-b18e-e962c08d4a14.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/70d94d4c-78b8-4163-829c-0ae16d846528.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/ee3614ca-0737-4669-8612-8c7d425b1f12.jpg?im_w=720"
    ] },
    { id: 2, title: "Mountain Cabin", location: "Denver",availability:"Dec 23-28", pricePerNight: 120 , imageUrl:[
        "https://a0.muscache.com/im/pictures/miso/Hosting-1267384633794753482/original/3e1da5e5-e1fc-4a3b-af0f-488187cb5e36.png?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-1267384633794753482/original/6449ea93-9332-4c26-8537-0b35f0031ff3.png?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-1267384633794753482/original/66fea833-50ce-4c3e-bc45-c6380ecc375e.png?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-1267384633794753482/original/c410518d-5d45-476e-a58f-c39fc1a52380.png?im_w=720",

    ]},
    { id: 3, title: "Tree House", location: "Miami",availability:"Dec 23-28", pricePerNight: 150 , imageUrl:[
        "https://a0.muscache.com/im/pictures/bd8bb5dc-d3d4-4887-b4c1-375026f1b832.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/6f3457af-567d-4966-a98f-5cd95dc350f2.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/bd775213-4e18-4961-91cd-950e587ac1a6.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/7ca16d4c-5af7-4871-9d8f-92d4fc2751ed.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/a6fb3a2a-25f8-4a5f-a258-073ced6fe343.jpg?im_w=720"
    ]},
    { id: 4, title: "Crew Cabin", location: "Denver",availability:"Dec 23-28", pricePerNight: 120 ,imageUrl:[
        "https://a0.muscache.com/im/pictures/51700f74-4d89-4b6d-adc3-d3ade8ddf45e.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/7413a50d-f099-42a6-b92f-0eb6f7c7be38.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/42b14aaf-8fdb-40a3-9877-6d4e4c1ece14.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/6fb5c810-4d9a-41f7-8798-370e2adb31ec.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/42b14aaf-8fdb-40a3-9877-6d4e4c1ece14.jpg?im_w=720"
    ]},
    { id: 5, title: "Haunted House", location: "Miami",availability:"Dec 23-28", pricePerNight: 150, imageUrl:[
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzM4OTY2NDkxOTU1NjE2Mjg1/original/4b6f5283-a4a8-4923-9a17-0fefffd0b7eb.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzM4OTY2NDkxOTU1NjE2Mjg1/original/428b0163-1a21-4ea0-b151-b656676abca5.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzM4OTY2NDkxOTU1NjE2Mjg1/original/ab91093d-8d55-461e-93d9-89b8c1017053.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/4171e700-9d50-426b-b17d-70d96150e87f.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/ff946b0d-8fbe-4a10-a3fb-a4b886b20448.jpg?im_w=720"
    ] }
];

// Routes
app.get('/api/listings', (req, res) => res.json(listings));

app.get('/api/listings/:id', (req, res) => {
    const listing = listings.find(l => l.id === parseInt(req.params.id));
    listing ? res.json(listing) : res.status(404).send('Listing not found');
});

app.post('/api/bookings', (req, res) => res.send({ message: 'Booking successful!' }));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
