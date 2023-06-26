const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll({
    include: [Product]
  })
  const tags = tagData.map(tag => tag.get({ plain: true }))
  // be sure to include its associated Product data
  res.json(tags)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const tagId = await Tag.findByPk(req.params.id, { include: [Product] })
  const tag = tagId.get({ plain: true })
  // be sure to include its associated Product data
  res.json(tag)
});

router.post('/', async (req, res) => {
  // create a new tag
  console.log(req.body)
  const newTag = await Tag.create(req.body)
  res.json(newTag)
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const update = await Tag.update(req.body, {
    where: { id: req.params.id }
  })
  res.json(update)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({ where: { id: req.params.id } })
  res.json({ message: "Deleted" })
});

module.exports = router;
