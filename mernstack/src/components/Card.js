const Card = () => {
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src="https://media.istockphoto.com/id/1703810986/ro/fotografie/pizza-margherita-cu-sos-pelati-mozzarella-rosii-si-busuioc.jpg?s=612x612&w=0&k=20&c=N2twLjQQUGvyUOTiVEVgUsX3d1ij6WWXT5k_3cYb54g="
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is some important Text</p>
            <div className="contaner w-100">
              <select className="m-2 h-100 bg-success">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100 bg-success rounded">
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select>
              <div className="d-inline h-100 fs-5">Total Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card