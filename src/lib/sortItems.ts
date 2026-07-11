export const sortItems = (items: any[], order: any[]) => {
    return [...items].sort((a, b) => {
        for (const key of order) {
            let result = 0;
            switch (key) {
                case "selling_price":
                    result = Number(a.selling_price) - Number(b.selling_price);
                    break;
                case "product_availability":
                    result = Number(b.product_availability) - Number(a.product_availability);
                    break;
                case "category":
                    result = a.cataloguename.localeCompare(b.cataloguename);
                    break;
            }
            if (result !== 0) return result;

        }
        return 0;
    })
}