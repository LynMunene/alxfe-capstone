
import BillDetails from "../components/menu/BillDetails";
import Cart from "../components/menu/Cart";
import MenuCard from "../components/menu/MenuCard";


const Menu = () =>{
  return (
    <section  className="bg-[#111315] min-h-[calc(100vh-5rem)] overflow-hidden flex flex-col md:flex-row gap-3 ">
      <div className="flex-1 md:flex-[3]  rounded-lg overflow-hidden">
      <div className="p-2  h-[calc(100vh-8rem)] overflow-y-auto">
          <MenuCard />
        </div>
      </div>
   
    {/*Right Div*/}
    <div className="flex-1 bg-[#111315]  rounded-sm p-2 mt-4 md:mt-0">
      <Cart />
      <BillDetails />

      </div>
    </section>
  )
}
export default Menu;