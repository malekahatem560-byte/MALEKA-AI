import express from 'express';
import cors from 'cors';

export const startBridge = (port: number = 8080) => {
    const app = express();
    app.use(cors()); 
    app.use(express.json());

    // نقطة اتصال الواجهة (Lovable Interface)
    app.post('/api/studio/command', async (req, res) => {
        const { action, payload } = req.body;
        console.log(`[BRIDGE] Received command: ${action}`);
        
        // هنا يتم التوجيه للمحرك (سيتم ربط الوكلاء لاحقاً)
        res.status(200).json({ 
            status: 'RECEIVED', 
            action: action,
            message: 'Command routed to Maleka Core' 
        });
    });

    app.listen(port, () => {
        console.log(`[BRIDGE] Maleka API Gateway active on port ${port}`);
    });
};
