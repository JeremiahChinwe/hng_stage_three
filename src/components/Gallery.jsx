import { useState, useRef, Suspense } from "react"
import { BsSearch } from "react-icons/bs"
import { allImages } from "../library/Library"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


export default function Gallery() {
    const [user] = useAuthState(auth)
    const [search, setSearch] = useState("")
    const dragItem = useRef()
    const dragOverItem = useRef()
    const [previewImages, setPreviewImages] = useState(allImages)


    const dragStart = (e, position) => {
        if (user) {
            dragItem.current = position
        }
    }

    const dragEnter = (e, position) => {
        if (user) {
            dragOverItem.current = position;
        }
    }

    const dragDrop = () => {
        if (user) {
            const copyListItems = [...previewImages]
            const dragItemContent = copyListItems[dragItem.current]
            copyListItems.splice(dragItem.current, 1)
            copyListItems.splice(dragOverItem.current, 0, dragItemContent)
            dragItem.current = null;
            dragOverItem.current = null
            setPreviewImages(copyListItems)
            toast.success("Rearranged Successfully", { position: "top-center", autoClose: 3000, theme: "dark" });
        } else {
            toast.success("You must log in to enable the drag and drop feature", { position: "top-center", autoClose: 7000, theme: "dark" });
        }
    }


            const renderAllImages = previewImages.map((image, index) => (
                <div
                    key={index}
                    className={`max-w-[300px] md:max-w-[400px] mx-auto bg-white/90 rounded-md cursor-grab 
            ${image.tags?.toLowerCase().includes(search) ? "block" : "hidden"}`}
                    draggable
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragEnd={dragDrop}
                >
                    <img
                        src={image.imageUrl}
                        alt={image.tags}
                        className="rounded-tl-md rounded-tr-md object-cover"
                    />
                    <small
                        className="text-[#111111] font-[600] text-xl py-2 px-4 block text-center"
                    >{image.tags}
                    </small>
                </div>
            )
            )
    


    return (
        <>
            <section className="text-white/90 flex flex-col items-center justify-center">

                <div className="bg-[#111111] w-full text-white/90">
                    <form className="w-[80%] max-w-[600px] flex items-center gap-8 border-[1px] my-4 py-2 md:py-4 px-6 border-slate-200 rounded-full mx-auto text-xl">
                        <label htmlFor="search" className="absolute -left-[100%]">Search</label>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            autoComplete="off"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Seacrh your favorite image"
                            className="w-full border-none outline-none bg-transparent placeholder:text-sm md:placeholder:text-lg"
                        />
                        <BsSearch size={15} />
                    </form>
                </div>


                <article className="mt-4 mb-8 lg:my-14 p-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Suspense fallback={<h2>Loading...</h2>}>
                        {renderAllImages}
                    </Suspense>
                </article>

            </section>
            <ToastContainer />
        </>
    )
}
