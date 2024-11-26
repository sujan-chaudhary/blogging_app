const uploadImage = (req, res)=>{
    if(!req.file){
        return res.status(400).send("No file uploaded.");
    }
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    res.status(200).json({url: imageUrl});
}
export default uploadImage;