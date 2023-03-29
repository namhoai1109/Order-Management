const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs')
const { createReturnObject } = require('../utils/returnObjectUtil')

exports.register = async (req, res) => {
  try {
    fs.readFile('./data/locations.json', 'utf8', async (err, data) => {
      const cities = JSON.parse(data)
      for (const city of cities) {
        const districtData = city.districts.map(district => ({
          name: district.name
        }))

        const existingCity = await prisma.city.findUnique({
          where: { name: city.name },
          include: { districts: true }
        })

        if (existingCity) {
          continue
        }

        await prisma.$transaction(async (prisma) => {
          await prisma.city.create({
            data: {
              name: city.name,
              districts: {
                create: districtData
              }
            },
            include: {
              districts: true
            }
          })
        })
      }
    })
    
  } catch (err) {
    console.log(err)
    // res.status(500).send({ message: err.message })
  } finally {
    await prisma.$disconnect()
  }
}

exports.getLocations = async (req, res) => {
  try {
    const cities = await prisma.city.findMany({
      orderBy: {
        id: 'asc'
      },
      include: {
        districts: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    const result = cities.map(city => ({
      value: city.id,
      label: city.name,
      districts: city.districts.map(district => ({
        value: district.id,
        label: district.name
      }))
    }))

    res.status(200).send(createReturnObject(result, '', 'Get locations successfully', 200))

  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Get locations failed', 500))

  } finally {
    await prisma.$disconnect()
  }
}
