const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags and associated product data
    const tagData = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(tagData);
    console.log('Tag data has been recieved')
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` with associated product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include:  [{ model: Product}],
    });
    res.status(200).json(tagData);
    console.log(`Category data for '${tagData.tag_name}' has been recieved`)

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
    console.log('New Tag has been created');
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      req.body,
      {
        where: {
          id: req.params.id,
        },
      });
    res.status(200).json(updatedTag);
    console.log(`Tag ${req.params.id} has been updated`)
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy(
      {
        where: {
          id: req.params.id,
        },
      });
    res.status(200).json(deletedTag);
    console.log(`Tag ${req.params.id} has been deleted`)
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
