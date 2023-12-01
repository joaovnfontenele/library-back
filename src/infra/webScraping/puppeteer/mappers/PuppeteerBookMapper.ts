
// import { Book } from "src/modules/Book/entities/Book";

// export class PrimaBookMapper {
//     static toPrisma({ description, id, image, siteId, statusId,
//         title, url }: Book): BookRow {
//         return {
//             id,
//             title,
//             description,
//             url,
//             image,
//             statusId,
//             siteId,
//         }
//     }

//     static toDomain({ id, ...userData }: BookRow): Book {
//         return new Book({ ...userData }, id)
//     }
// }