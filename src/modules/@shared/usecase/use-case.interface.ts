export default interface useCaseInterface {
    execute(input: any): Promise<any>;
}