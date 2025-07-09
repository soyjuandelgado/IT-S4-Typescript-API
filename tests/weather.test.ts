import { getWeather } from "../src/weather";

describe("Function getWeather", () => {
    it("should be declared", () => {
        expect(typeof getWeather).toBe("function");
    });

    it("should return Weather type", async () => {
        const data = await getWeather();
        expect(data).toBeTruthy();
        expect(typeof data).toBe("object");
        expect(data).toHaveProperty("temp");
        expect(data).toHaveProperty("sky");
        expect(data).toHaveProperty("skyCode");
        expect(typeof data.temp).toBe("string");
        expect(typeof data.sky).toBe("string");
        expect(typeof data.skyCode).toBe("string");
        expect(typeof Number(data.skyCode)).toBe("number");
    });

    it("should return an error", async () => {
        jest
            .spyOn(global, "fetch")
            .mockResolvedValue({
                    ok: false,
                    status: 500,
                } as Response);
        await expect(getWeather()).rejects.toThrow();
    });
});
