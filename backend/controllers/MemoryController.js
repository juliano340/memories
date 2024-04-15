const Memory = require('../models/Memory');
const fs = require('fs');


const removeOldImage = (memory) => {
    fs.unlink(__dirname + '/../public' + memory.src, (err) => {
        if (err) console.log(err);
        else console.log("Imagem removida");
    })
}

const createMemory = async (req, res) => {

    try {
        const { title, description } = req.body;
        

        const src = `/images/${req.file.filename}`;

        if (!title || !description || !src) {
            return res.status(400).json({ msg: "Preencha todos os campos!" });
        }

        const newMemory = new Memory({
            title,
            description,
            src
        });

        await newMemory.save();
        res.status(200).json({ msg: "Uploaded!", newMemory });



    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro!");
    }

}

const getMemories = async (req, res) => {

    try {
        const memories = await Memory.find();
        res.status(200).json({ memories });

    } catch (error) {
        res.status(500).send("Ocorreu um erro ao pesquisar as memórias!");
    }

}
const getMemory = async (req, res) => {

    try {

        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ msg: "Memória não encontrada!" });
        }

        res.status(200).json({ memory });

    } catch (error) {
        res.status(500).send("Ocorreu um erro ao pesquisar a memória!");

    }
}

const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findByIdAndDelete(req.params.id);
        if (!memory) {
            return res.status(404).json({ msg: "Memória não encontrada!" });
        }

        removeOldImage(memory);
        res.status(200).json({ msg: "Memória removida!" });

    } catch (error) {
        res.status(500).send("Ocorreu um erro ao deletar a memória!");
    }
}

const updateMemory = async (req, res) => {

    try {
        const { title, description } = req.body;
        let src = null

        if (req.file)
            src = `/images/${req.file.filename}`;

        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ msg: "Memória não encontrada!" });
        }

        if (src) {
            removeOldImage(memory);
        }

        const updateData = {}

        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (src) updateData.src = src;

        const updatedMemory = await Memory.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json({ updatedMemory, msg: "Memória atualizada!" });


    } catch (error) {

    }

}

const toggleFavorite = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ msg: "Memória não encontrada!" });
        }

        memory.favorite = !memory.favorite;

        memory.save();

        memory.favorite ? res.status(200).json({ msg: "Memória adicionada ao favoritos!" }) : res.status(200).json({ msg: "Memória removida dos favoritos!" })




    } catch (error) {
        res.status(500).send("Ocorreu um erro!");
    }
}

const addComment = async (req, res) => {

    const { name, text } = req.body;
    console.log(name, text)

    try {

        

        if (!name || !text) return res.status(400).json({ msg: "Preencha todos os campos, imbecíl!" });
        const comment = { name, text };
        const memory = await Memory.findById(req.params.id);
        if (!memory) return res.status(404).json({ msg: "Memória não encontrada!" });
        memory.comments.push(comment);
        await memory.save();
        res.status(200).json({ msg: "Comentário adicionado!", memory })

    } catch (error) {
        res.status(500).send("Ocorreu um erro!");
    }
}

module.exports = {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
    updateMemory,
    toggleFavorite,
    addComment
}; 