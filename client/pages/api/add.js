const baseUrl = "http://localhost:5000";

const addTask = async (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    try {
        const response = await fetch(`${baseUrl}/v1/tasks/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                title: title,
                description: description,
            }),
        });
        return res.status(200).json(await response.json());
    } catch (error) {
        throw new Error(error);
    }
};

export default addTask;
