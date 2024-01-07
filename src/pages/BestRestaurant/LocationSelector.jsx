import Form from 'react-bootstrap/Form';

export function LocationSelector({data, setData, defalutValue, disabled = false}) {
    return (
        <div style={{ width: 350, margin: 0, margin: "auto", marginBottom: 20 }}>
            <Form.Select aria-label="Default select example" onChange={(e) => setData(e)} disabled={disabled}>
            <option value={"no"}>{defalutValue}</option>
            {data.map((item, idx) => 
                <option value={item} key={idx}>{item}</option>
            )}
            </Form.Select>
        </div>
    )
}