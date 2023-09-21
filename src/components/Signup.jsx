import { Link, useNavigate } from "react-router-dom"
import useForm from "../hooks/useForm"
import { useState } from "react"
import { auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

const initialState = {
    email: "",
    password: ""
}

export default function Signup() {
    const [values, handleChange, resetForm] = useForm(initialState)
    const [isError, setIsError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const canSave = [...Object.values(values)].every(Boolean)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password)
            resetForm()
            setIsLoading(false)
            navigate('/')
        } catch (error) {
            setIsError(error.message)
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <section className="px-4 flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className=" text-white/90 w-[80%] max-w-[450px] rounded-lg px-8 border-[0.5px] border-white/40">
                <h2 className="font-[700] text-xl text-center mt-6 mb-4">Create an account</h2>
                {isError && <p className="text-red-700 text-sm text-center my-4">{isError}</p>}
                <label
                    htmlFor={values.email}
                    className="flex justify-between items-baseline font-[400] text-lg tracking-wide"
                >Email:</label>
                <input
                    type="email"
                    name="email"
                    id={values.email}
                    value={values.email}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Your email"
                    className={`my-1 py-2 px-3 rounded-md w-full outline-none text-slate-900`}
                />

                <label htmlFor="password"
                    className="flex justify-between items-baseline font-[400] text-lg tracking-wide mt-6"
                >Password:</label>

                <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Your password"
                    className={`my-1 py-2 px-3 rounded-md w-full outline-none text-slate-900`}
                />

                <button
                    className={`mt-6 w-full mx-auto text-center border-[1px] border-white/40 p-3 rounded-full font-[600] text-lg ${canSave ? 'bg-transparent hover:scale-[1.025] hover:font-[600] cursor-pointer' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                    disabled={!canSave}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                <div className="flex items-center gap-2 my-6 text-xs">
                    <p className=" text-white/70">Already have an account?</p>
                    <Link to="/login" className="underline hover:no-underline">Sign in</Link>
                </div>
            </form>
        </section>
    )
}
