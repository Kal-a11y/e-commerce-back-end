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

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
