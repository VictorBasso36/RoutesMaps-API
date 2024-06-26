import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
const router = express.Router();

export interface Delivery {
    id: number;
    customerName: string;
    startPoint: string;
    endPoint: string;
    updateAt: Date;
}

router.get<{}, {}>('/', async (req, res) => {
    try {
        //SQL EXAMPLE
        // const data: Delivery[] = await prisma.$queryRawUnsafe(`SELECT * FROM Delivery`);
        const data = await prisma.delivery.findMany()
        const deliveries = data.map(delivery => ({
            ...delivery,
        }));

        res.status(200).json(deliveries);

    } catch (error) {
        
        res.status(500).json({ error: 'An error occurred while fetching the deliveries.' });

    }
});

router.post<{}, {}>('/', async (req, res) => {
    try {
        const delivery: Delivery = req?.body
        console.log(delivery)
        
        //SQL EXAMPLE
        // const deliveryData = await prisma.$executeRaw<Delivery[]>(
        //     Prisma.sql`INSERT INTO Delivery (customerName, endPoint, startPoint) VALUES (${delivery.customerName}, ${delivery.endPoint}, ${delivery.startPoint})`
        // );

        const deliveryData = await prisma.delivery.create({
            data: {
                customerName: delivery?.customerName,
                endPoint: delivery?.endPoint,
                startPoint: delivery?.startPoint
            }
        })
        
        res.status(200).json(deliveryData);

    } catch (error) {
        
        res.status(500).json({ error: 'An error occurred while fetching the deliveries.' });

    }
});

// Fetch a single delivery by ID
router.get('/:id', async (req, res) => {
    try {
        const delivery = await prisma.delivery.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (delivery) {
            res.status(200).json(delivery);
        } else {
            res.status(404).json({ error: 'Delivery not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the delivery.' });
    }
});

// Delete a delivery by ID
router.delete('/:id', async (req, res) => {
    try {
        await prisma.delivery.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the delivery.' });
    }
});

export default router;