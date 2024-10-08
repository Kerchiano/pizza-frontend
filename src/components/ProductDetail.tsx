import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../apiSlice";

const ProductDetail = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { data: product } = useGetProductQuery(productSlug || "");
  return (
    <>
      <main>
        <section className="product-page">
          <div className="product-page-content">
            <div className="product-page-inside">
              <div className="product-img">
                <img src={`${product?.image}`} alt="" />
              </div>
              <div className="product-detail-description">
                <h1>{`${product?.title}`}</h1>
                <div className="description">
                  <div className="less">
                    <div className="description-desktop">
                      <p>Інгредієнти</p>
                      Філе куряче sous-vide, шинка, мисливські ковбаски,
                      пепероні, сир Моцарела, печериці, петрушка, цибуля
                      ріпчаста, соус BBQ та трюфельна олія
                    </div>
                  </div>
                </div>
                <div className="mobile-supplements-content">
                  {product?.topping.map((toppingItem) => (
                    <label
                      key={`${toppingItem.id}`}
                      className="mobile-supplements-item"
                    >
                      <input type="checkbox" />
                      <span className="mobile-supplements-item-name">{`${toppingItem.title}`}</span>
                      <span className="mobile-supplements-item-price">
                        <span className="without_price">Без</span>
                        <span className="with_price">{`+${toppingItem.price} грн`}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <div className="supplements-less">
                  <p className="supplements-title">Добавки</p>
                  <div className="supplements-content">
                    {product?.topping.map((toppingItem) => (
                      <div
                        key={`${toppingItem.id}`}
                        className="supplements-content-item"
                      >
                        <label className="supplements-item">
                          <input className="hidden" type="checkbox" />
                          <span className="supplements-item-name">{`${toppingItem.title}`}</span>
                          <span className="supplements-item-price">
                            {`+${toppingItem.price}`}
                            <span> грн</span>
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bottom">
                  <div className="price-wrap-btn">
                    <div className="bottom-price">
                      <div className="price-less">
                        <span>{`${product?.price}`} грн</span>
                      </div>
                      <a className="product-buy-button">
                        <span>Замовити</span>
                      </a>
                    </div>
                  </div>
                  <div className="free-delivery">
                    Безкоштовна доставка при замовленні від 950 грн
                  </div>
                  <div className="discount">
                    Знижка 20%, якщо забираєте замовлення з ресторану
                  </div>
                </div>
                <div className="description-mobile">
                  <div className="less">
                    <div className="description-mobile">
                      Філе куряче sous-vide, шинка, мисливські ковбаски,
                      пепероні, сир Моцарела, печериці, петрушка, цибуля
                      ріпчаста, соус BBQ та трюфельна олія
                    </div>
                  </div>
                </div>
                <div className="mobile-bottom">
                  <div className="mobile-bottom-container">
                    <div className="free-delivery">
                      Безкоштовна доставка при замовленні від 950 грн
                    </div>
                    <div className="discount">
                      Знижка 20%, якщо забираєте замовлення з ресторану
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductDetail;
