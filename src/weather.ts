// https://www.el-tiempo.net/api

type Weather = { temp: string; sky: string; skyCode: string };

export const getWeather = (): Promise<Weather> => {
    const province = "08";
    const city = "08019";
    const url = `https://www.el-tiempo.net/api/json/v2/provincias/${province}/municipios/${city}`;

    return fetch(url)
        .then((res) => {
            if (res.ok) return res.json();
            else throw new Error(String(res.status));
        })
        .then((response) => {
            return {
                temp: response.temperatura_actual,
                sky: response.stateSky.description,
                skyCode: response.stateSky.id,
            };
        })
        .catch((error) => {
            throw error;
        });
};
