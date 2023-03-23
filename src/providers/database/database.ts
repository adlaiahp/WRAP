import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import * as constant from '../constants/constants';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Database {

    isOpen: boolean;
    public storage: SQLiteObject;

    constructor(public http: HttpClient,
        public sqlite: SQLite) {
        this.createDatabase().then((result) => {
        });

    }

    //  To create database
    public createDatabase(): any {
        return new Promise((resolve, reject) => {
            try {
                if (!this.isOpen) {
                    // to create table tool
                    this.sqlite.create({ name: "wrap.db", location: "default" }).then((db: SQLiteObject) => {
                        this.storage = db;
                        db.executeSql("CREATE TABLE IF NOT EXISTS Tool (Id INTEGER PRIMARY KEY,Content TEXT, IconId INTEGER,QId INTEGER)", []);
                        this.isOpen = true;
                    });
                    this.createTable(constant.WHATIS_WRAP);
                    //to create table for ItemDaily
                    this.createTable(constant.ITEM_DISPLAY);
                    //to create table for tool
                    this.createTable(constant.WELLNESS_TOOL);
                    //to create table for Item Crisis
                    this.createTable(constant.ITEM_CRISIS);
                    //to create table for Crisis Lookup Case
                    this.createTable(constant.LOOKUP_CASE);
                    //to create table for crisis lookup
                    this.createTable(constant.CRISIS_LOOKUP);
                    //to create table for crisis lookup doctor
                    this.createTable(constant.LOOKUP_DOCTOR);
                    // to create table for crisis lookup Medications
                    this.createTable(constant.LOOKUP_MEDICATIONS);
                    // to create table for Takes care 
                    this.createTable(constant.LOOKUP_TAKESCARE);
                    // to create table foor Resuming Responsibility
                    this.createTable(constant.RESUMING_RESPONSIBILITY);
                    // to create table for LookUp Resuming
                    this.createTable(constant.LOOKUP_RESUMING);
                    // TO create table for PostCrisis
                    this.createTable(constant.ITEM_POST_CRISIS);
                    // To create table for LookUp Supporters
                    this.createTable(constant.LOOKUP_SUPPORTERS);
                    // to create table for Lookup PeopleThink
                    this.createTable(constant.LOOKUP_PEOPLETHANK);
                    // to create table for LookUp Apologize
                    this.createTable(constant.LOOKUP_APOLOGIZE);
                    // to create table for LookUp Amends
                    this.createTable(constant.LOOKUP_AMENDS);
                    // to create table for Lookup Not Takes Care
                    this.createTable(constant.LOOKUP_NOT_TAKESCARE);
                    // to create table for crisis LookUp Help
                    this.createTable(constant.LOOKUP_THINGSHELP);
                    // to create table for crisis LookUp No Help
                    this.createTable(constant.LOOKUP_DONT_HELP);
                    // to create table for crisis LookUp Task for Others
                    this.createTable(constant.LOOKUP_OTHERS_TASK);
                }
                resolve(true);
            } catch (error) {
                reject(false);
            }
        });
    };

    TableManipulation(tableName) {
        let dynamicQuery;
        switch (tableName) {
            case "Crisis":
                dynamicQuery = constant.INSERT_LOOKUP_DEFAULT;
                console.log("dq",dynamicQuery);
                break;
            case "PostCrisis":
                dynamicQuery = constant.INSERT_POST_CRISIS;
                break;
            case "whatisWrap":
                dynamicQuery = constant.INSERT_WHATISWRAP;
                break;
        }
        this.executeNonQuery(dynamicQuery, []).then((result) => {
        });
    }

    //To create table
    public createTable(query: string) {
        this.sqlite.create({ name: "wrap.db", location: "default" }).then((db: SQLiteObject) => {
            db.executeSql(query, []);
            this.isOpen = true;
        });
    }

    //To execute query
    public executeNonQuery(query: string, params: any) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql(query, params).then((data) => {
                resolve(data);
            }, (error) => {
                console.log("Error :ExecuteNonQuery :", error);
                reject(error);
            });
        });
    }

    public executeReader(query: string, params: any = []) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql(query, params).then((data) => {
                let result = [];
                if (data.rows.length > 0) {
                    for (let i = 0; i < data.rows.length; i++) {
                        result.push(data.rows.item(i));
                    }
                }
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

}
