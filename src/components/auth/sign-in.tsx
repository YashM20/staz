import { auth, signIn, signOut } from "@/auth"



export default async function SignIn() {
  const session = await auth().catch(() => null)

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="text-center mb-4">
        {session ? (
          <div className="p-4 bg-green-100 text-green-800 border-2 border-green-800/20 rounded-md">
            <p className="font-medium">Logged in as:</p>
            <p>{session.user?.name}</p>
            <p className="text-sm text-gray-600">{session.user?.email}</p>
          </div>
        ) : (
          <div className="p-4  text-yellow-800 border-2 border-yellow-800/20 rounded-md">
            <p>Not logged in</p>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex flex-col items-center justify-center gap-4 border-2 border-gray-300 rounded-md p-4">
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button 
              className="text-white rounded-md "
            >
              Sign in with Google
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 border-2 border-gray-300 rounded-md p-4">
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button 
              className=" text-white rounded-md "
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 