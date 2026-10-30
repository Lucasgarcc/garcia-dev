# Software Engineering: The Complete Cycle (From Process to Scale)

### The "Cliché" Nobody Follows
Understanding how a Software (Product) process works before wanting to start writing code is fundamental. Requirements and the target audience must be clearly defined. It may sound like a cliché, but this is extremely common in real software development, and many developers ignore it in their rush to code. Without this foundation, you are only writing functions for a problem that may not even exist.

### The Market, AI and Reasoning
The market has changed significantly with the use of AI in development. This created the need to adapt and start using **Prompt Engineering** inside the IDE, ensuring greater productivity. However, fast delivery does not always mean efficient delivery.

Be very careful about completely delegating work to AI without understanding the process first. Focus on **Architecture and Processes**, limiting excessive AI use. Delegate only simple tasks that remain under your **complete control**. Creating a **Design System** from scratch is one example: AI speeds up writing, but you are responsible for the integrity of the system as a whole.

### The Structural Layer: System Design and Components
To maintain software integrity, you need to master the fundamentals:
* **System Design:** The solution's design: how systems communicate and how infrastructure supports the product. It is the master plan before the code.
* **Smart Components:** They are the "brain." They hold logic and state management, orchestrating data before passing it to the interface.

---

### The Real Flow: The Unified Gear
Real software works as an integrated gear:

1. **The User** interacts with your **Frontend**.
2. The Frontend sends a request through a **RESTful API** (the messenger that follows HTTP GET, POST, PUT, DELETE standards).
3. **Nginx** (the Maître d') receives the request as a Reverse Proxy and forwards it.
4. The **Backend** processes the business rule and accesses the **Database** (SQL or NoSQL).

---

### Performance: Where Real Software Stands Apart
As the target audience grows, you need scale and speed. This is where the Load Balancer and Cache layers come in.

#### 1. Load Balancer
**What it solves:** It prevents server collapse.
Instead of a single server carrying all the weight, the Load Balancer distributes requests among multiple instances of your application. If a server fails, the Load Balancer redirects traffic to the remaining active ones, ensuring the system never goes offline.

#### 2. Frontend Cache (Browser & CDN)
**What it solves:** Latency and data consumption.
On the front end, caching prevents the user from downloading the same files (JS, CSS, images) every time the page is refreshed.
* **How it solves it:** Through cache *Headers* or *Service Workers*, the browser stores a local copy of these files. The result is instant navigation and a huge saving in the user's bandwidth.

#### 3. Backend Cache (Redis / In-Memory)
**What it solves:** Database bottlenecks.
Fetching data from the Database (Disk) is "expensive" and slow.
* **How it solves it:** We store the results of complex queries in fast memory (such as Redis). If 1,000 people request the same product list, the Backend delivers the data already prepared in the cache in milliseconds, without frying the Database with repetitive queries.

---

### The Golden Rule of a Pull Request
Never make a **PR (Pull Request)** without reviewing the code **YOURSELF**, not through AI. The final word and the technical responsibility for what goes to production are yours. Knowledge must prevail to prevent the atrophy of logical reasoning.

> "AI can write the query, but you decide how the gear turns without jamming. Mastery of architecture is what guarantees software integrity."
