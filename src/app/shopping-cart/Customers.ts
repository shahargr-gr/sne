import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn } from '@remult/core';
import { Agent } from 'http';
import { Agents } from './Agents';
import { Areas } from './Areas';

@EntityClass
export class Customers extends IdEntity {
    name = new StringColumn();
    Area_ID = new IdColumn();
    Agent_ID= new IdColumn();
    constructor() {
        super({
            name: "Customers",
            allowApiCRUD:true,
            allowApiRead:true
        });
    }
} 
