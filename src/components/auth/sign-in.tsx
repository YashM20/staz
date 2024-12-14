import { auth, signIn, signOut } from "@/auth"



export default async function SignIn() {
  const session = await auth().catch(() => null)

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="mb-4 text-center">
        {session ? (
          <div className="rounded-md border-2 border-green-800/20 bg-green-100 p-4 text-green-800">
            <p className="font-medium">Logged in as:</p>
            <p>{session.user?.name}</p>
            <p className="text-sm text-gray-600">{session.user?.email}</p>
          </div>
        ) : (
          <div className="rounded-md  border-2 border-yellow-800/20 p-4 text-yellow-800">
            <p>Not logged in</p>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-gray-300 p-4">
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button 
              className="rounded-md text-white "
            >
              Sign in with Google
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-gray-300 p-4">
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button 
              className=" rounded-md text-white "
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 