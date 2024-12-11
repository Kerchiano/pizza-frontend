interface FeedbackTypeSelectorProps {
  values: { rating: string };
  setFieldValue: (field: string, value: string) => void;
}

const FeedbackTypeSelector = ({
  values,
  setFieldValue,
}: FeedbackTypeSelectorProps) => {
  return (
    <div className="radio-btns">
      <div
        onClick={() => setFieldValue("rating", "Подяка")}
        style={{
          background:
            "url('https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/blagodarno.png') no-repeat 10px center",
          backgroundColor: values.rating === "Подяка" ? "#f2f2f2" : "#fff",
        }}
        className="feedback-type"
      >
        Подяка
      </div>
      <div
        onClick={() => setFieldValue("rating", "Скарга")}
        style={{
          background:
            "url('https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/zhaloba.png') no-repeat 10px center",
          backgroundColor: values.rating === "Скарга" ? "#f2f2f2" : "#fff",
        }}
        className="feedback-type"
      >
        Скарга
      </div>
      <div
        onClick={() => setFieldValue("rating", "Побажання")}
        style={{
          background:
            "url('https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/pozhelanie.png') no-repeat 10px center",
          backgroundColor: values.rating === "Побажання" ? "#f2f2f2" : "#fff",
        }}
        className="feedback-type"
      >
        Побажання
      </div>
    </div>
  );
};

export default FeedbackTypeSelector;
