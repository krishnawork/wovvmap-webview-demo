import { bridgeStorage, NodePoint } from "wovvmap-webview-bridge";

export function searchPointsByText(query: string): NodePoint[] {
    if (!query) {
        
        return bridgeStorage.searchablePoints;
    }

    const lowerQuery = query.toLowerCase();
    const results = bridgeStorage.searchablePoints.filter(point => {
        const text = point.LocationName?.text?.toLowerCase();
        return text && text.includes(lowerQuery);
    }).sort((a, b) => {
        const ta = a.LocationName?.text!;
        const tb = b.LocationName?.text!;
        return ta.localeCompare(tb);
    });
    return results;
}