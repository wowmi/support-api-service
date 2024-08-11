import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ProductCategory } from "./entities/product_categories.entity";
import { Product } from "./entities/product.entity";
import { ProductContent } from "./entities/content.entity";

describe("ProductsController", () => {
  let controller: ProductsController;
  let service: jest.Mocked<ProductsService>;

  const mockProductsService = {
    getProductCategories: jest.fn(),
    findProduct: jest.fn(),
    getProductContent: jest.fn(),
    createProduct: jest.fn(),
    createCategory: jest.fn(),
    updateProduct: jest.fn(),
    removeProduct: jest.fn(),
    deleteCategory: jest.fn(),
  };

  const mockProduct = {
    id: "1",
    title: "Product 1",
    description: "Description 1",
    category: { id: "1", name: "Category 1", products: [] },
    content: [],
    image: "image-url",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService, jest.Mocked<ProductsService>>(
      ProductsService,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getProductCategories", () => {
    it("should return an array of categories", async () => {
      const result = [{ id: "1", name: "Category 1", products: [] }];
      service.getProductCategories.mockResolvedValue(result);

      expect(await controller.getProductCategories()).toBe(result);
      expect(service.getProductCategories).toHaveBeenCalled();
    });
  });

  describe("getProductById", () => {
    it("should return a product", async () => {
      const result: Product = {
        id: "1",
        title: "Product 1",
        description: "Description 1",
        category: { id: "1", name: "Category 1", products: [] },
        content: [],
        image: "image-url",
      };
      service.findProduct.mockResolvedValue(result);

      expect(await controller.getProductById("1")).toBe(result);
      expect(service.findProduct).toHaveBeenCalledWith("1");
    });
  });

  describe("getContentByProductId", () => {
    it("should return an array of product content", async () => {
      const result = mockProduct.content;
      service.getProductContent.mockResolvedValue(result);

      expect(await controller.getContentByProductId("1")).toBe(result);
      expect(service.getProductContent).toHaveBeenCalledWith("1");
    });
  });

  describe("createProduct", () => {
    it("should create a product", async () => {
      const createProductDto: CreateProductDto = {
        title: "Product 1",
        description: "Description 1",
      };
      const result: Product = {
        id: "1",
        ...createProductDto,
        category: { id: "1", name: "Category 1", products: [] },
        content: [],
        image: "image-url",
      };
      service.createProduct.mockResolvedValue(result);

      expect(await controller.createProduct(null, "1", createProductDto)).toBe(
        result,
      );
      expect(service.createProduct).toHaveBeenCalledWith(
        "1",
        createProductDto,
        null,
      );
    });
  });

  describe("createCategory", () => {
    it("should create a category", async () => {
      const createCategoryDto: CreateCategoryDto = { name: "Category 1" };
      const result: ProductCategory = {
        id: "1",
        name: createCategoryDto.name,
        products: [],
      };
      service.createCategory.mockResolvedValue(result);

      expect(await controller.createCategory(createCategoryDto)).toBe(result);
      expect(service.createCategory).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe("updateProduct", () => {
    it("should update a product", async () => {
      const updateProductDto: UpdateProductDto = {
        title: "Updated Product",
        description: "Updated Description",
      };
      const result = {
        ...mockProduct,
        ...updateProductDto,
        image: "updated-image-url",
      };
      service.updateProduct.mockResolvedValue(result);

      expect(await controller.updateProduct("1", updateProductDto)).toBe(
        result,
      );
      expect(service.updateProduct).toHaveBeenCalledWith("1", updateProductDto);
    });
  });

  describe("removeProduct", () => {
    it("should remove a product", async () => {
      const result = {
        affected: 1,
        raw: {},
      };
      service.removeProduct.mockResolvedValue(result);

      expect(await controller.removeProduct("1")).toBe(result);
      expect(service.removeProduct).toHaveBeenCalledWith("1");
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category", async () => {
      const result = {
        affected: 1,
        raw: {},
      };
      service.deleteCategory.mockResolvedValue(result);

      expect(await controller.deleteCategory("1")).toBe(result);
      expect(service.deleteCategory).toHaveBeenCalledWith("1");
    });
  });
});
