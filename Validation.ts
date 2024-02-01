import pool from "./db";
const checkIfExists = (query: string, param: any): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        pool.query(query, [param], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows.length > 0);
            }
        });
    });
};
export { checkIfExists };