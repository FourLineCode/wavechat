export function parseErrorMessage(error: any): string {
    try {
        const [err] = JSON.parse(error.message);
        return err.message;
    } catch (e) {
        return error.message;
    }
}
