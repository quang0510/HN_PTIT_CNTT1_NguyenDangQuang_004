class Customer {
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor( id: number , name: string ,  email: string ,   phone: string){

        this.id = id;
        this.name = name;
        this. email = email;
        this.phone = phone;
    }

    getDetails(){
        return `
            ID: ${this.id}
            Tên: ${this.name}
            Email: ${this.email}
            Phone: ${this.phone}
        `
    }
}

abstract class Pet {
    id: number;
    type: string;
    price: number;
    isAvailable: boolean;

    constructor( id: number ,  type: string , price: number , isAvailable: boolean){
        this.id = id;
        this.type = type;
        this.price = price;
        this.isAvailable = true;
    }

    sell(): void{
        this.isAvailable = false;
    }
    restock(): void{
        this.isAvailable = true;
    }
    abstract calculateTotalPrice(quantity: number): number;
    abstract getSpecialCareInstructions(): string[];
    abstract getOriginInfo(): string;

}

class Dog extends Pet{

    getSpecialCareInstructions(): string[] {
        const dog: string[]= [" chó thuần chủng , trại nhân giống uy tín"]
        return dog
    }

    getOriginInfo(): string {
        return ` Chó thuần chủng , trại nhân giống uy tín`
    }

}
class Cat extends Pet{
    getSpecialCareInstructions(): string[] {
        const cat: string[]= ["Dọn khcaty cát thường xuyên , tiêm phòng định kỳ"]
        return cat
    }
    getOriginInfo(): string {
        return ` Mèo nhà lai , thân thiện`
    }
}

class Bird extends Pet{
    getSpecialCareInstructions(): string[] {
        const bird: string[] = ["Cho ăn hạt và trái cây, Giữ lồng sạch sẽ"]
        return bird
    }
    getOriginInfo(): string {
        return ` Nhập khẩu từ vùng nhiệt đới`
    }
}

class Sale{
    saleID: number;
    customer: Customer;
    pet: Pet;
    quantity: number;
    totalPrice: number;

    constructor(saleID: number ,customer: Customer, pet: Pet , quantity: number, totalPrice: number ){
        this.saleID = saleID;
        this.customer = customer;
        this.pet = pet ;
        this.quantity = quantity;
        this.totalPrice = totalPrice;

    }

    getDetails(){
        return `
            saleID : ${this.saleID}
            customer: ${this.customer}
            pet: ${this.pet}
            quantity: ${this.quantity}
            totalPrice: ${this.totalPrice}
        `
    }
}

class PetShop {
    pets: Pet[];
    customers: Customer[];
    sales : Sale[]

    constructor(pets: Pet[] ,  customers: Customer[] ,  sales : Sale[]){
        this.pets = pets;
        this.customers = customers;
        this.sales = sales;
    }

    addPet(pet: Pet):void{
        this.pets.push(pet)
        console.log(` Thêm thú cưng thành công `);
    }

    addCustomer(name: string , email: string , phone: string): Customer{
        const newCustomer = new Customer(
            this.customers[this.customers.length-1].id++ ,
            name,
            email,
            phone
        )
        this.customers.push(newCustomer)
        return newCustomer
    }

    sellPet(customerId: number, petId: number, quantity: number): Sale | null {

        const index = this.pets.findIndex((ele) =>ele.id === customerId);

        if (index !== -1) {
        this.pets.splice(index, 1);
    }

    }

    restockPet(petId: number): void{
        this.pets.find((ele)=>ele.id === petId)
    }

    listAvailablePets(): void{
        const petAvailable = this.pets.filter((ele) => ele.isAvailable === true )
        return console.log(`thú cưng còn hàng ${petAvailable}`);
    }

    listCustomerPurchases(customerId: number): void {
        const listCustomerPurchases = this.customers.filter((ele)=>ele.id === customerId);
        console.log(listCustomerPurchases);
        
    }

    calculateTotalRevenue(): number{
        return this.sales.reduce((sum, sale) => sum + sale.totalPrice, 0);

    }

   getPetTypeCount(): void {
    const petCount = new Map<string, number>();

    this.pets.forEach(pet => {
        petCount.set(pet.type, (petCount.get(pet.type) || 0) + 1);
    });

    console.log("Số lượng từng loại thú:");
    petCount.forEach((count, type) => {
        console.log(`${type}: ${count}`);
    });
}


    getPetCareInstructions(petId: number): void{

    }

    getPetOrigin(petId: number): void{

    }

    findCustomerById(collection: Customer[], id: number): Customer | undefined {

    }

    findSaleById(collection: Sale[], id: number): Sale | undefined {

    }


}

let choice: number;

const petShop = new PetShop();


do {
    choice = Number (
    prompt(
        `
        1. Thêm khách hàng mới\n
        2. Thêm thú cưng mới (chọn loại: Dog, Cat, Bird)\n
        3. Bán thú cưng (chọn khách hàng, chọn thú, nhập số lượng)\n
        4. Nhập lại hàng\n
        5. Hiển thị danh sách thú còn hàng (filter)\n
        6. Hiển thị danh sách giao dịch của một khách hàng (filter)\n
        7. Tính và hiển thị tổng doanh thu (reduce)\n
        8. Đếm số lượng từng loại thú (reduce hoặc map)\n
        9. Tìm kiếm và hiển thị thông tin bằng mã định danh (generic)\n
        10. Hiển thị hướng dẫn chăm sóc và nguồn gốc thú (find)\n
        11. Thoát chương trình\n
        `
    )
)
    switch (choice) {
        case 1:
            const id1 =Number(prompt(` Nhap id:`))
            const name = prompt(`Nhap ten:`);
            const email = prompt (` Nhap email:`)
            const phone = prompt (` Nhap so dien thoai`)
            petShop.addCustomer( id1, name , email , phone);
            break;
        case 2:

            let choice2: number;
            do {
                  const choice2 = Number (prompt(`
                1. DOG\n
                2. CAT\n
                3. BIRD\n
                4. Thoat\n
                Chọn loại bạn muốn:
                `))
                switch (choice2) {
                    case 1:
                        const idDog =Number( prompt(` nhap id:`));
                        const typeDog = prompt(`Nhap loai :`);
                        const priceDog = Number(prompt(`nhap gia tien:`));
                        const availableDog = true;
                        petShop.addPet(idDog , typeDog , priceDog , availableDog);

                        break;
                    case 2:
                        const idCat =Number( prompt(` nhap id:`));
                        const typeCat = prompt(`Nhap loai :`);
                        const priceCat = Number(prompt(`nhap gia tien:`));
                        const availableCat = true;
                        petShop.addPet(idCat , typeCat , priceCat , availableCat);
                        
                        break;
                    case 3:
                        const idBird =Number( prompt(` nhap id:`));
                        const typeBird = prompt(`Nhap loai :`);
                        const priceBird = Number(prompt(`nhap gia tien:`));
                        const availableBird = true;
                        petShop.addPet(idBird , typeBird , priceBird , availableBird);
                        break;

                    case 4: 
                        console.log(`Thoat`);
                        break;
                
                    default:
                        console.log(`Lua chon khong hop le , vui long chon lai`);
                        break;
                }
                
            } while (choice2 != 4);
          
            break;
        case 3:
            const id3 = Number(prompt(`Nhap id pet can ban:`))
            petShop.sellPet(id3);
            break;
        case 4:
            const petId = Number (prompt(`Nhap id pet ban muon nhap cho thu cung`));
            petShop.restockPet(petId);
            break;
        case 5:
            petShop.listAvailablePets();
            break;
        case 6:
            const id6 =Number( prompt ( ` nhap id khach hang can tim :`))
            petShop.listCustomerPurchases(id6);
            break;
        case 7:
            const revenue = petShop.calculateTotalRevenue();
            console.log(` Tổng doanh thu: ${revenue.toLocaleString("vi-VN")}₫`);
            break;
        case 8:
            petShop.getPetTypeCount();
            break;
        case 9:
    
            break;
        case 10:
    
            break;
        case 11:
            console.log(` Thoát chương trình`);
            break;
        default:
            console.log(` Lựa chọn không hợp lệ , vui lòng chọn lại`);
    }
} while (choice !== 11);



