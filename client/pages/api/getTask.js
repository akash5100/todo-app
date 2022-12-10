const getTasks = async (req, res) => {
    const response = await fetch("http://localhost:5000/v1/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });

    const data = await response.json();
    if (!data) {
        res.status(400).json([]);
    }
    res.status(200).json(data);
};

export default getTasks;
