export const GetProfile = async (url, token, userId, setLoading, setUserProfile) => {
    setLoading(true)
    const res = await fetch(`${url}user/profile/${userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })

    const data = await res.json()

    setLoading(false)

    if (data.status == 'success') {
        setUserProfile(data.user)
    }

    return data
}