
import { Site as SiteRow } from "@prisma/client";
import { Site } from "src/modules/site/entities/Site";

export class PrismaSiteMapper {
    static toPrisma({ id, name, url }: Site): SiteRow {
        return {
            id,
            name,
            url
        }
    }

    static toDomain({ id, ...userData }: SiteRow): Site {
        return new Site({ ...userData }, id)
    }
}