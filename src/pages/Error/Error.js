import React from "react";

const Error = () => {
  return (
    <section class="relative flex h-screen items-center justify-center">
      <div class="mx-auto">
        <div class="-mx-4 flex">
          <div class="w-full px-4">
            <div class="mx-auto max-w-[400px] text-center">
              <h2 class="mb-2 text-[50px] font-bold leading-none text-gray-700 sm:text-[80px] md:text-[100px]">
                404
              </h2>
              <h4 class="mb-3 text-[22px] font-semibold leading-tight">
                Oops! That page can’t be found
              </h4>
              <p class="mb-8 text-lg">
                The page you are looking for maybe is deleted
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
