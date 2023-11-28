
const sendRequest = async (data, endpoint) => {
    console.log(endpoint);

    try {
        fetch(endpoint,
            {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Server Error');
            }
        })
        .then((json) => {
            return json
        })
    } catch (error) {
        console.error("ERROR:", error);
    }
}

export default sendRequest;