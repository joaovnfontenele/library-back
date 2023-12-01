
import { Paragraph as ParagraphRow } from "@prisma/client";
import { Chapter } from "src/modules/chapter/entities/chapter";
import { Paragraph } from "src/modules/paragraph/entities/paragraph";


export class PrismaParagraphMapper {
    static toPrisma({ chapterId, content, id, order }: Paragraph): ParagraphRow {
        return {
            chapterId,
            content,
            id,
            order
        }
    }

    static toDomain({ id, ...userData }: ParagraphRow): Paragraph {
        return new Paragraph({ ...userData }, id)
    }
}