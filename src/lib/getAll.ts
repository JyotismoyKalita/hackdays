import { fetchCategories, userCategories } from './items/category';
import { getGeminiResponse } from './ai/gemini';
import { trackExpire } from './items/expiryTracking';
import { fetchAllItems, userItems } from './items/getAll';
import {
    getPurchasedItems,
    PurchasedItemType,
} from './items/getPurchasedItems';
import { getSoldItems, SoldItemType } from './items/getSoldItems';
import { getTopSellingItems, userTopSelling } from './items/topselling';

function filterItem(items: userItems[]) {
    return items.map(
        ({
            id,
            name,
            category,
            quantity,
            price,
            costPrice,
            hasExpiry,
            manufacturingDate,
            expiryDate,
            addedAt,
        }) => ({
            id,
            name,
            category,
            quantity,
            price,
            costPrice,
            hasExpiry,
            manufacturingDate,
            expiryDate,
            addedAt,
        })
    );
}

function filterSale(sales_data: SoldItemType[]) {
    return sales_data.map(
        ({ name, category, quantity, salePrice, soldAt }) => ({
            name,
            category,
            quantity,
            salePrice,
            soldAt,
        })
    );
}

function filterPurchase(purchase_data: PurchasedItemType[]) {
    return purchase_data.map(
        ({ name, category, quantity, costPrice, purchasedAt }) => ({
            name,
            category,
            quantity,
            costPrice,
            purchasedAt,
        })
    );
}

function filterCategory(category_data: userCategories[]) {
    return category_data.map(({ name }) => ({ name }));
}

export async function getAll() {
    const [
        items,
        sales_data,
        purchase_data,
        category_data,
        top_selling,
        expiry_tracking,
    ]: [
        userItems[],
        SoldItemType[],
        PurchasedItemType[],
        userCategories[],
        userTopSelling[],
        userItems[],
    ] = await Promise.all([
        fetchAllItems(),
        getSoldItems(),
        getPurchasedItems(),
        fetchCategories(),
        getTopSellingItems(),
        trackExpire(),
    ]);

    const filteredItems = filterItem(items);
    console.log(filteredItems);
    const filteredSalesData = filterSale(sales_data);
    console.log(filteredSalesData);
    const filteredPurchaseData = filterPurchase(purchase_data);
    console.log(filteredPurchaseData);
    const filteredCategories = filterCategory(category_data);
    console.log(filteredCategories);

    const prompt1 = `Treat this as a new chat.
    For items: ${JSON.stringify(filteredItems)}.
    for each category: ${filteredCategories}. 
    Considering the Sales Data: 
    ${JSON.stringify(filteredSalesData)} 
    and Purchase Data: 
    ${JSON.stringify(filteredPurchaseData)}, 
    give me recommendation of Max Stock Level, Min Stock Level and Reorder Level in a parseable object-array-object {Category: [{Item,CurrentStock(the quantity field of the Item data provided),MaxStock,MinStock,Reorder},{...},...], Category: [{...},{...},...],...} format. 
    As this is a request made from api, give only the json data else the program will break`;

    const prompt2 = `Treat this as a new chat.
    For items: ${JSON.stringify(filteredItems)}.
    for each category: ${filteredCategories}. 
    Considering the Sales Data: 
    ${JSON.stringify(filteredSalesData)} 
    and Purchase Data: 
    ${JSON.stringify(filteredPurchaseData)}, 
    Considering their price, cost price, demand, date left to expire(if any), season and how long since purchase they have not been sold, give me a new price (dynamic price) exclude dynamic pricing for items such as snacks, packaged food and other grocery items which don't need dynamic pricing.
    The output must be in a parseable object-array-object {Category: [{Item, Demand(HIGH/LOW), willExpireIn(give "-" if no expiry days, else give "X days), currentPrice, newPrice},{...},...], Category: [{...},{...},...],...} format.
    As this is a request made from api, give only the json data else the program will break`;

    const prompt3 = `Treat this as a new chat.
    For items: ${JSON.stringify(filteredItems)}.
    for each category: ${filteredCategories}. 
    Considering the Sales Data: 
    ${JSON.stringify(filteredSalesData)} 
    and Purchase Data: 
    ${JSON.stringify(filteredPurchaseData)}, 
    Considering demand and season, recommend me new trending/bestselling products of specific brand(only for the provided categories), in India by searching the web.
    The output must be in a parseable object-array {Category: [Item,Item,...], Category: [Item, Item,...]} format.
    As this is a request made from api, give only the json data else the program will break`;

    const prompt4 = `Treat this as a new chat.
    For items: ${JSON.stringify(filteredItems)}.
    for each category: ${filteredCategories}. 
    Considering the Sales Data: 
    ${JSON.stringify(filteredSalesData)} 
    and Purchase Data: 
    ${JSON.stringify(filteredPurchaseData)}, 
    Considering their demand, date left to expire(if any), location(India), trend, season and how long since purchase they have not been sold, recommend me what items should i discontinue(only consider the extreme case).
    The output must be in a parseable object-array-object {Category: [{Item,id},{Item,id},...], Category: [{...}, {...},...]} format.
    As this is a request made from api, give only the json data else the program will break`;

    const responses = await Promise.all([
        getGeminiResponse(prompt1),
        getGeminiResponse(prompt2),
        getGeminiResponse(prompt3),
        getGeminiResponse(prompt4),
    ]);

    const [aiStock, dynamicPrice, aiRecommendations, aiDiscontinuations] =
        responses.map((response) => JSON.parse(response.slice(8, -4)));

    const datas = new Map([
        ['items', items],
        ['salesData', sales_data],
        ['purchaseData', purchase_data],
        ['categoryData', category_data],
        ['topSelling', top_selling],
        ['expiryTracking', expiry_tracking],
        ['aiStockLevels', aiStock],
        ['dynamicPrice', dynamicPrice],
        ['aiRecommendations', aiRecommendations],
        ['aiDiscontinuations', aiDiscontinuations],
    ]);

    console.log(datas);

    return datas;
}
