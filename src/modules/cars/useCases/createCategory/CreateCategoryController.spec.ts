import { app } from "@shared/infra/http/app"
import request from "supertest"

describe("create category controller", ()=>{
    it("teste",async()=>{

        await request(app).get("/cars/available").expect(200)
    })
})