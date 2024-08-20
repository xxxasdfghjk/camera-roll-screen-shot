import React, { useState, ChangeEvent } from "react";
import domtoimage from "dom-to-image";
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
                    // dataUrl を使って画像を保存するなどの処理を行います
                })
                .catch((error) => {
                    console.error("Error capturing screenshot:", error);
                });
        }
    };

    return (
        <div className="p-4">
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mb-4" />
            <button onClick={captureScreenshot}>Capture Screenshot</button>
            <div className="flex justify-center flex-col">
                <div>
                    <div
                        id="capture"
                        className="grid grid-cols-[repeat(auto-fill,100px)] gap-1 place-content-center py-2"
                    >
                        {images.map((image, index) => (
                            <div key={index} className="relative w-full">
                                <img
                                    src={image}
                                    alt={`uploaded-${index}`}
                                    className="object-cover w-[100px] h-[100px] shadow-md"
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
