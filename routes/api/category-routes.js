const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categoryData = await Category.findAll({
    include: [Product]
  })
  const categories = categoryData.map(category => category.get({ plain: true }))
  // be sure to include its associated Products
  res.json(categories)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const categoryId = await Category.findByPk(req.params.id, { include: [Product] })
  const category = categoryId.get({ plain: true })
  // be sure to include its associated Products
  res.json(category)
});

router.post('/', async (req, res) => {
  // create a new category
  console.log(req.body)
  const newCategory = await Category.create(req.body)
  res.json(newCategory)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const update = await Category.update(req.body, {
    where: { id: req.params.id }
  })
  // const updates = update.get({ plain: true })
  res.json(update)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({ where: { id: req.params.id } })
  res.json({ message: "Deleted" })
});

module.exports = router;
