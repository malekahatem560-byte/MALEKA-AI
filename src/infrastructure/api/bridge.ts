import express from 'express';
import cors from 'cors';
import { DirectorAgent } from '../../studio/agents/director_agent';

export const startBridge = (port: number = 8080) => {
    const app = express();
    app.use(cors()); 
    app.use(express.json());

    // تهيئة الوكيل السينمائي
    const director = new DirectorAgent('DIR_01', {} as any, {} as any);

    app.post('/api/maleka/command', async (req, res) => {
        const { action, payload } = req.body;
        console.log(`[MALEKA BRIDGE] Routing ${action} to Director...`);
        
        // ربط مباشر: الواجهة -> Bridge -> DirectorAgent
        const result = await director.execute(payload);
        
        res.status(200).json({ 
            status: 'EXECUTED', 
            directorResult: result 
        });
    });

    app.listen(port, () => {
        console.log(`[MALEKA BRIDGE] Engine Gateway & DirectorAgent Active on port ${port}`);
    });
};
