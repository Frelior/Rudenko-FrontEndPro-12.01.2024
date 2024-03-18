export const modalElement = `<div class="modal">
<div class="modal-card">
    <h2>Buy product</h2>
        <form action="#" class="modal-card__info">
            <h3 class="title">Product Name</h3>
            <div class="modal-card__product-amount">
                <label for="product-amount">Amount</label>
                <input type="number" name="Product amount" id="product-amount" placeholder="Product amount" value="1" required>
            </div>
            <div class="modal-card__user">
                <input type="text" name="User name" id="username" placeholder="User name" required>
                <input type="text" name="User surname" id="surname" placeholder="User surname" required>
            </div>
            <div class="modal-card__delivery">
                <label for="city">City</label>
                <select name="City" id="city" required>
                    <option value="Kharkiv">Kharkiv</option>
                    <option value="Kyiv">Kyiv</option>
                    <option value="Other city">Other city</option>
                </select>
                <div class="post-office">
                    <label for="nova-post">Nova post office #</label>
                    <input type="number" name="Nova post" id="nova-post" placeholder=""  required>
                </div>
            </div>
            <div class="payment">
                <p>Payment: </p>
                <input type="radio" id="card" name="Payment" value="Card" checked>
                <label for="card">Card</label>
                <input type="radio" id="cash" name="Payment" value="Cash">
                <label for="cash">Cash</label>
            </div>
            <div class="modal-card__comment">
                <label for="comment">Comment</label>
                <textarea type="text" name="Comment" id="comment" placeholder="Comment" value=""></textarea>
            </div>
            <button class="modal-card__buy" type="submit">Buy</button>
        </form>
</div>
</div>`