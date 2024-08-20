import React, { useState, ChangeEvent } from "react";
import domtoimage from "dom-to-image";
import { Slider } from "./components/ui/slider";
const ImageUpload: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const imageUrls = files.map((file) => URL.createObjectURL(file));
            setImages([...images, ...imageUrls]);
        }
    };
    const captureScreenshot = async () => {
        const node = document.getElementById("capture");
        if (node) {
            domtoimage
                .toPng(node)
                .then((dataUrl) => {
                    const aEl = document.createElement("a");
                    aEl.href = dataUrl;
                    aEl.download = "result.png";
                    aEl.click();
                })
                .catch((error) => {
                    console.error("Error capturing screenshot:", error);
                });
        }
    };
    const [width, setWidth] = useState(100);
    const [gap, setGap] = useState(1);
    return (
        <div className="p-4">
            <div className="flex flex-row items-center h-32">
                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mb-4" />
                <button onClick={captureScreenshot}>Capture Screenshot</button>
                <div className="w-96 h-32 ml-12 flex flex-col">
                    <div>
                        <p className="py-2">Box Width</p>
                        <Slider
                            onValueChange={(value) => {
                                setWidth(value[0]);
                            }}
                            defaultValue={[100]}
                            max={500}
                            min={20}
                            step={1}
                        ></Slider>
                    </div>
                    <div>
                        <p className="py-2">Gap Width</p>
                        <Slider
                            onValueChange={(value) => {
                                setGap(value[0]);
                            }}
                            defaultValue={[1]}
                            max={20}
                            min={1}
                            step={1}
                        ></Slider>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-col">
                <div>
                    <div
                        id="capture"
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(auto-fill, ${width}px)`,
                            gap: gap,
                            placeContent: "center",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                        }}
                    >
                        {images.map((image, index) => (
                            <div key={index} className="relative w-fit flex justify-center">
                                <img
                                    src={image}
                                    alt={`uploaded-${index}`}
                                    className={`object-cover w-[${width}px] h-[${width}px] shadow-md rounded-full`}
                                    style={{
                                        width: `${width}px`,
                                        height: `${width}px`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <div>
            <ImageUpload />
        </div>
    );
};

export default App;
