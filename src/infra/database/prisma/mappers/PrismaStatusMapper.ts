
import { Status as StatusRow } from "@prisma/client";
import { Status } from "src/modules/status/entities/status";

export class PrismaStatusMapper {
    static toPrisma({ id, description }: Status): StatusRow {
        return {
            id,
            description
        }
    }

    static toDomain({ id, ...userData }: StatusRow): Status {
        return new Status({ ...userData }, id)
    }
}