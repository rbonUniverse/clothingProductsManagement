import loadingImage from "../../../../src/assets/images/loading.gif";
import "./Loading.css";

function Loading(): JSX.Element {
    return (
        <div className="Loading">
			<img src={loadingImage} />
        </div>
    );
}

export default Loading;
