import { DomainEvent } from '../domain_event';

export class DurableAppendLog {
    // تحديث الكونستركتور ليقبل المعاملات المطلوبة في container.ts
    constructor(private storagePath: string, private nodeId: string) {}

    // تحديث دالة append لتطابق 5 معاملات كما في event_repository.ts
    public async append(id: string, aggregateId: string, eventType: string, version: number, data: any): Promise<void> {
        const entry = { id, aggregateId, eventType, version, data };
        const serialized = JSON.stringify(entry, (key, value) => 
            typeof value === 'bigint' ? value.toString() : value
        );
        process.stdout.write(serialized + '\n');
    }

    // إضافة دالة replay لتفادي خطأ Property does not exist
    public async replay(aggregateId: string, callback: (event: any) => Promise<void>): Promise<void> {
        // سيتم إضافة المنطق الخاص بإعادة التشغيل هنا لاحقاً
        return;
    }
}
