const Tag = require('../models/tag.model');

exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.getAll();
        res.status(200).json({
            message: 'Get all tags successfully',
            "data": tags
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getTagById = async (req, res) => {
    try {
        const id = req.params.tagId;
        const tags = await Tag.findTagById(id);

        const exitstingTag = await Tag.findTagById(id);
        
        if (!exitstingTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json({
            message: 'Get one tag successfully',
            "data": tags
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createTag = async (req, res) => {
    try {
        const { tagName } = req.body;

        await Tag.createTag(tagName);
        res.status(201).json({ 
            message: 'Tag created successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateTag = async (req, res) => {
    try {
        const id = req.params.tagId;
        const { tagName } = req.body;

        console.log(id);
        

        const exitstingTag = await Tag.findById(id);

        if (!exitstingTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        await Tag.updateTag(id, tagName);
        res.status(200).json({ message: 'Tag updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteTag = async (req, res) => {
    try {
        const id = req.params.tagId;
        const exitstingTag = await Tag.findById(id);

        if (!exitstingTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        await Tag.deleteTag(id);
        res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tag', error: error.message });
    }
}
