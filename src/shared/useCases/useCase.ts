export abstract class UseCase {
    abstract execute(props:any):Promise<any>
}