import { AxiosRequestConfig } from 'axios';
import { BaseRestClient, RestClientType } from './lib/BaseRestClient.js';
import { RestClientOptions } from './lib/requestUtils.js';
import { SpotBrokerRebateRequest } from './types/request/spot.types.js';
import { APIResponse } from './types/response/shared.js';
import {
  GetServiceSystemStatusResponse,
  SpotBrokerRebateResult,
  SystemTimeResult,
} from './types/response/spot.types.js';

/**
 *
 */
export class SpotClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return 'spot';
  }

  /**
   *
   * System Status Endpoints
   *
   **/

  getSystemTime(): Promise<APIResponse<SystemTimeResult>> {
    return this.get('system/time');
  }

  getServiceSystemStatus(): Promise<
    APIResponse<{
      service: Array<{
        title: string;
        service_type: string;
        status: number;
        start_time: number;
        end_time: number;
      }>;
    }>
  > {
    return this.get('system/service');
  }

  /**
   *
   * Public Market Data Endpoints
   *
   **/

  getSpotCurrenciesV1(): Promise<
    APIResponse<{
      currencies: Array<{
        id: string;
        name: string;
        withdraw_enabled: boolean;
        deposit_enabled: boolean;
      }>;
    }>
  > {
    return this.get('spot/v1/currencies');
  }

  getSpotTradingPairsListV1(): Promise<
    APIResponse<{
      symbols: Array<{
        symbol: string;
        symbol_id: string;
        base_currency: string;
        quote_currency: string;
        quote_increment: string;
        base_min_size: string;
        base_max_size: string;
        price_min_precision: number;
        price_max_precision: number;
        expiration: string;
        min_buy_amount: string;
        min_sell_amount: string;
      }>;
    }>
  > {
    return this.get('spot/v1/symbols');
  }

  getSpotSymbolDetails(): Promise<
    APIResponse<{
      symbol: string;
      symbol_id: string;
      base_currency: string;
      quote_currency: string;
      quote_increment: string;
      base_min_size: string;
      base_max_size: string;
      price_min_precision: number;
      price_max_precision: number;
      expiration: string;
      min_buy_amount: string;
      min_sell_amount: string;
    }>
  > {
    return this.get('spot/v1/symbols/details');
  }

  getSpotTickersV3(): Promise<
    APIResponse<{
      tickers: Array<{
        symbol: string;
        last_price: string;
        quote_volume_24h: string;
        base_volume_24h: string;
        high_24h: string;
        low_24h: string;
        open_24h: string;
        close_24h: string;
        best_ask: string;
        best_bid: string;
      }>;
    }>
  > {
    return this.get('spot/quotation/v3/tickers');
  }

  getSpotTicker(params?: { symbol: string }): Promise<
    APIResponse<{
      ticker: {
        symbol: string;
        last_price: string;
        quote_volume_24h: string;
        base_volume_24h: string;
        high_24h: string;
        low_24h: string;
        open_24h: string;
        close_24h: string;
        best_ask: string;
        best_bid: string;
      };
    }>
  > {
    return this.get('spot/quotation/v3/ticker', params);
  }

  getSpotLatestKlineV3(params: {
    symbol: string;
    before?: number;
    after?: number;
    step?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      Array<
        [
          string, // t - timestamp
          string, // o - open price
          string, // h - highest price
          string, // l - lowest price
          string, // c - close price
          string, // v - trading volume, with a unit of currency
          string, // qv - trading volume, the value is the quantity in quote currency
        ]
      >
    >
  > {
    return this.get('spot/quotation/v3/lite-klines', params);
  }

  getSpotHistoryKlineV3(params: {
    symbol: string;
    before?: number;
    after?: number;
    step?: number;
    limit?: number;
  }): Promise<
    APIResponse<
      Array<
        [
          string, // t - timestamp
          string, // o - open price
          string, // h - highest price
          string, // l - lowest price
          string, // c - close price
          string, // v - trading volume, with a unit of currency
          string, // qv - trading volume, the value is the quantity in quote currency
        ]
      >
    >
  > {
    return this.get('spot/quotation/v3/history-klines', params);
  }

  getSpotDepthV3(params: { symbol: string; limit?: number }): Promise<
    APIResponse<{
      ts: string;
      symbol: string;
      asks: Array<[string, string]>;
      bids: Array<[string, string]>;
    }>
  > {
    return this.get('spot/quotation/v3/books', params);
  }

  getSpotRecentTrades(params: { symbol: string; limit?: number }): Promise<
    APIResponse<
      Array<
        [
          string, // symbol
          string, // ts
          string, // price
          string, // size
          string, // side
        ]
      >
    >
  > {
    return this.get('spot/quotation/v3/trades', params);
  }

  /**
   *
   * Public Market Data Endpoints (History Version)
   *
   **/

  getSpotV2Ticker(): Promise<
    APIResponse<{
      tickers: Array<{
        symbol: string;
        last_price: string;
        quote_volume_24h: string;
        base_volume_24h: string;
        high_24h: string;
        low_24h: string;
        open_24h: string;
        close_24h: string;
        best_ask: string;
        best_ask_size: string;
        best_bid: string;
        best_bid_size: string;
        fluctuation: string;
        url: string;
        timestamp: number;
      }>;
    }>
  > {
    return this.get('spot/v2/ticker');
  }

  getSpotTickerDetail(params: { symbol: string }): Promise<
    APIResponse<{
      symbol: string;
      last_price: string;
      quote_volume_24h: string;
      base_volume_24h: string;
      high_24h: string;
      low_24h: string;
      open_24h: string;
      close_24h: string;
      best_ask: string;
      best_ask_size: string;
      best_bid: string;
      best_bid_size: string;
      fluctuation: string;
      timestamp: number;
      url: string;
    }>
  > {
    return this.get('spot/v1/ticker_detail', params);
  }

  getSpotKLineSteps(): Promise<
    APIResponse<{
      steps: number[];
    }>
  > {
    return this.get('spot/v1/steps');
  }

  getSymbolKline(params: {
    symbol: string;
    from: number;
    to: number;
    step?: number;
  }): Promise<
    APIResponse<
      Array<{
        timestamp: number;
        open: string;
        high: string;
        low: string;
        close: string;
        last_price: string;
        volume: string;
        quote_volume: string;
      }>
    >
  > {
    return this.get('spot/v1/symbols/kline', params);
  }

  getSpotSymbolBook(params: {
    symbol: string;
    precision?: string;
    size?: number;
  }): Promise<
    APIResponse<{
      timestamp: number;
      buys: Array<{
        amount: string;
        total: string;
        price: string;
        count: string;
      }>;
      sells: Array<{
        amount: string;
        total: string;
        price: string;
        count: string;
      }>;
    }>
  > {
    return this.get('spot/v1/symbols/book', params);
  }

  getSymbolTrades(params: { symbol: string; n?: number }): Promise<
    APIResponse<{
      trades: Array<{
        amount: string;
        order_time: number;
        price: string;
        count: string;
        type: string;
      }>;
    }>
  > {
    return this.get('spot/v1/symbols/trades', params);
  }

  /**
   *
   * Funding Account Endpoints
   *
   **/

  getAccountBalance(params?: { currency?: string }): Promise<
    APIResponse<{
      wallet: Array<{
        currency: string;
        name: string;
        available: string;
        frozen: string;
      }>;
    }>
  > {
    return this.getPrivate('account/v1/wallet', params);
  }

  getCurrenciesAccount(): Promise<
    APIResponse<{
      currencies: Array<{
        currency: string;
        name: string;
        contract_address: string | null;
        network: string;
        withdraw_enabled: boolean;
        deposit_enabled: boolean;
        withdraw_minsize: string | null;
        withdraw_minfee: string | null;
      }>;
    }>
  > {
    return this.get('account/v1/currencies');
  }

  getSpotWallet(): Promise<
    APIResponse<{
      wallet: Array<{
        id: string;
        available: string;
        name: string;
        frozen: string;
      }>;
    }>
  > {
    return this.getPrivate('spot/v1/wallet');
  }

  getDepositAddress(): Promise<APIResponse<any>> {
    return this.getPrivate('account/v1/deposit/address');
  }

  getWithdrawCharge(): Promise<APIResponse<any>> {
    return this.getPrivate('account/v1/withdraw/charge');
  }

  submitWithdrawal(params: {
    currency: string;
    amount: string;
    destination: 'To Digital Address';
    address: string;
    address_memo?: string;
  }): Promise<APIResponse<any>> {
    return this.postPrivate('account/v1/withdraw/apply', params);
  }

  getDepositWithdrawHistory(params?: {
    currency?: string;
    operation_type: 'deposit' | 'withdraw';
    N: number;
  }): Promise<
    APIResponse<{
      records: Array<{
        withdraw_id: string;
        deposit_id: string;
        operation_type: 'deposit' | 'withdraw';
        currency: string;
        apply_time: number;
        arrival_amount: string;
        fee: string;
        status: number;
        address: string;
        address_memo: string;
        tx_id: string;
      }>;
    }>
  > {
    return this.get('account/v2/deposit-withdraw/history', params);
  }

  getDepositWithdrawDetail(params: { id: string }): Promise<
    APIResponse<{
      record: {
        withdraw_id: string;
        deposit_id: string;
        operation_type: 'deposit' | 'withdraw';
        currency: string;
        apply_time: number;
        arrival_amount: string;
        fee: string;
        status: number;
        address: string;
        address_memo: string;
        tx_id: string;
      };
    }>
  > {
    return this.get('account/v1/deposit-withdraw/detail', params);
  }

  getIsolatedMarginAccount(params?: { symbol?: string }): Promise<
    APIResponse<{
      symbols: Array<{
        symbol: string;
        risk_rate: string;
        risk_level: string;
        buy_enabled: boolean;
        sell_enabled: boolean;
        liquidate_price: string;
        liquidate_rate: string;
        base: {
          currency: string;
          borrow_enabled: boolean;
          borrowed: string;
          borrow_unpaid: string;
          interest_unpaid: string;
          available: string;
          frozen: string;
          net_asset: string;
          net_assetBTC: string;
          total_asset: string;
        };
        quote: {
          currency: string;
          borrow_enabled: boolean;
          borrowed: string;
          borrow_unpaid: string;
          interest_unpaid: string;
          available: string;
          frozen: string;
          net_asset: string;
          net_assetBTC: string;
          total_asset: string;
        };
      }>;
    }>
  > {
    return this.get('spot/v1/margin/isolated/account', params);
  }

  postIsolatedMarginTransfer(params: {
    symbol: string;
    currency: string;
    amount: string;
    side: 'in' | 'out';
  }): Promise<
    APIResponse<{
      transfer_id: string;
    }>
  > {
    return this.post('spot/v1/margin/isolated/transfer', params);
  }

  getUserFee(): Promise<
    APIResponse<{
      user_rate_type: number;
      level: string;
      taker_fee_rate_A: string;
      maker_fee_rate_A: string;
      taker_fee_rate_B: string;
      maker_fee_rate_B: string;
      taker_fee_rate_C: string;
      maker_fee_rate_C: string;
    }>
  > {
    return this.get('spot/v1/user_fee');
  }

  getTradeFee(params: { symbol: string }): Promise<
    APIResponse<{
      symbol: string;
      buy_taker_fee_rate: string;
      sell_taker_fee_rate: string;
      buy_maker_fee_rate: string;
      sell_maker_fee_rate: string;
    }>
  > {
    return this.get('spot/v1/trade_fee', params);
  }

  /**
   *
   * Spot/Margin Trading Endpoints
   *
   **/

  submitSpotOrder(params: {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'limit' | 'market' | 'limit_maker' | 'ioc';
    client_order_id?: string;
    size?: string;
    price?: string;
    notional?: string;
  }): Promise<
    APIResponse<{
      order_id: string;
    }>
  > {
    return this.post('spot/v2/submit_order', params);
  }

  postMarginSubmitOrder(params: {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'limit' | 'market' | 'limit_maker' | 'ioc';
    clientOrderId?: string;
    size: string;
    price?: string;
    notional?: string;
  }): Promise<
    APIResponse<{
      order_id: number; // Note: The response type for order_id is number for margin orders
    }>
  > {
    return this.post('spot/v1/margin/submit_order', params);
  }

  postBatchOrders(params: {
    order_params: Array<{
      symbol: string;
      side: 'buy' | 'sell';
      type: 'limit' | 'market' | 'limit_maker' | 'ioc';
      client_order_id?: string;
      size: string;
      price?: string;
      notional?: string;
    }>;
  }): Promise<
    APIResponse<{
      responses: Array<{
        code: number;
        msg: string;
        data?: {
          order_id: string;
        };
      }>;
    }>
  > {
    return this.post('spot/v2/batch_orders', params);
  }

  postCancelOrder(params: {
    symbol: string;
    order_id?: string;
    client_order_id?: string;
  }): Promise<
    APIResponse<{
      result: boolean;
    }>
  > {
    // This function sends a POST request to the BitMart API to cancel a specified unfinished order
    return this.post('spot/v3/cancel_order', params);
  }

  postCancelOrders(params: {
    symbol?: string;
    side?: 'buy' | 'sell';
  }): Promise<APIResponse<{}>> {
    return this.post('spot/v1/cancel_orders', params);
  }

  postQueryOrder(params: {
    orderId: string;
    queryState?: string;
    recvWindow?: number;
  }): Promise<
    APIResponse<{
      orderId: string;
      clientOrderId: string;
      symbol: string;
      side: string;
      orderMode: string;
      type: string;
      state: string;
      price: string;
      priceAvg: string;
      size: string;
      filledSize: string;
      notional: string;
      filledNotional: string;
      createTime: number;
      updateTime: number;
    }>
  > {
    return this.post('spot/v4/query/order', params);
  }

  postQueryClientOrder(params: {
    clientOrderId: string;
    queryState?: string;
    recvWindow?: number;
  }): Promise<
    APIResponse<{
      orderId: string;
      clientOrderId: string;
      symbol: string;
      side: string;
      orderMode: string;
      type: string;
      state: string;
      price: string;
      priceAvg: string;
      size: string;
      filledSize: string;
      notional: string;
      filledNotional: string;
      createTime: number;
      updateTime: number;
    }>
  > {
    return this.post('spot/v4/query/client-order', params);
  }

  postQueryOpenOrders(params: {
    symbol?: string;
    orderMode?: 'spot' | 'iso_margin';
    startTime?: number;
    endTime?: number;
    limit?: number;
    recvWindow?: number;
  }): Promise<
    APIResponse<
      Array<{
        orderId: string;
        clientOrderId: string;
        symbol: string;
        side: 'buy' | 'sell';
        orderMode: 'spot' | 'iso_margin';
        type: 'limit' | 'market' | 'limit_maker' | 'ioc';
        state: 'new' | 'partially_filled';
        price: string;
        priceAvg: string;
        size: string;
        filledSize: string;
        notional: string;
        filledNotional: string;
        createTime: number;
        updateTime: number;
      }>
    >
  > {
    return this.post('spot/v4/query/open-orders', params);
  }

  postQueryHistoryOrders(params: {
    symbol?: string;
    orderMode?: 'spot' | 'iso_margin';
    startTime?: number;
    endTime?: number;
    limit?: number;
    recvWindow?: number;
  }): Promise<
    APIResponse<
      Array<{
        orderId: string;
        clientOrderId: string;
        symbol: string;
        side: 'buy' | 'sell';
        orderMode: 'spot' | 'iso_margin';
        type: 'limit' | 'market' | 'limit_maker' | 'ioc';
        state: 'filled' | 'canceled' | 'partially_canceled';
        price: string;
        priceAvg: string;
        size: string;
        filledSize: string;
        notional: string;
        filledNotional: string;
        createTime: number;
        updateTime: number;
      }>
    >
  > {
    return this.post('spot/v4/query/history-orders', params);
  }

  postQueryTrades(params: {
    symbol?: string;
    orderMode?: 'spot' | 'iso_margin';
    startTime?: number;
    endTime?: number;
    limit?: number;
    recvWindow?: number;
  }): Promise<
    APIResponse<
      Array<{
        tradeId: string;
        orderId: string;
        clientOrderId: string;
        symbol: string;
        side: 'buy' | 'sell';
        orderMode: 'spot' | 'iso_margin';
        type: 'limit' | 'market' | 'limit_maker' | 'ioc';
        price: string;
        size: string;
        notional: string;
        fee: string;
        feeCoinName: string;
        tradeRole: 'taker' | 'maker';
        createTime: number;
        updateTime: number;
      }>
    >
  > {
    return this.post('spot/v4/query/trades', params);
  }

  postQueryOrderTrades(params: {
    orderId: string;
    recvWindow?: number;
  }): Promise<
    APIResponse<
      Array<{
        tradeId: string;
        orderId: string;
        clientOrderId: string;
        symbol: string;
        side: 'buy' | 'sell';
        orderMode: 'spot' | 'iso_margin';
        type: 'limit' | 'market' | 'limit_maker' | 'ioc';
        price: string;
        size: string;
        notional: string;
        fee: string;
        feeCoinName: string;
        tradeRole: 'taker' | 'maker';
        createTime: number;
        updateTime: number;
      }>
    >
  > {
    return this.post('spot/v4/query/order-trades', params);
  }

  /**
   *
   * Spot/Margin Trading Endpoints (History versions)
   *
   **/

  postSpotSubmitOrder(params: {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'limit' | 'market' | 'limit_maker' | 'ioc';
    size?: string;
    price?: string;
    notional?: string;
    clientOrderId?: string;
  }): Promise<APIResponse<{ order_id: number }>> {
    // Switching to the new endpoint as the old one will soon be unsupported
    return this.post('spot/v2/submit_order', params);
  }

  postSpotBatchOrders(params: {
    orderParams: Array<{
      symbol: string;
      side: 'buy' | 'sell';
      type: 'limit' | 'market' | 'limit_maker' | 'ioc';
      size?: string;
      price?: string;
      notional?: string;
      clientOrderId?: string;
    }>;
  }): Promise<
    APIResponse<{
      orderResponses: Array<{
        code: number;
        msg: string;
        data?: { orderId: number };
      }>;
    }>
  > {
    // Switching to the new endpoint as the old one will soon be unsupported
    return this.post('spot/v2/batch_orders', params);
  }

  postSpotCancelOrder(params: {
    order_id?: number;
    clientOrderId?: string;
  }): Promise<APIResponse<{ result: boolean }>> {
    // Switching to the new endpoint as the old one will soon be unsupported
    return this.post('spot/v3/cancel_order', params);
  }

  getV4QueryOrder(params: { orderId: string }): Promise<
    APIResponse<{
      order_id: string;
      client_order_id?: string;
      symbol: string;
      create_time: number;
      side: 'buy' | 'sell';
      order_mode: 'spot' | 'iso_margin';
      type: 'limit' | 'market' | 'limit_maker' | 'ioc';
      price: string;
      price_avg: string;
      size: string;
      notional: string;
      filled_notional: string;
      filled_size: string;
      unfilled_volume: string;
      status: string;
    }>
  > {
    return this.get('spot/v4/query/order', params);
  }

  getV4QueryHistoryOrders(params: {
    symbol: string;
    order_mode?: 'spot' | 'iso_margin' | 'all';
    N?: number;
    start_time?: number;
    end_time?: number;
    status: '4' | '5' | '6' | '8' | '9' | '10' | '11';
  }): Promise<
    APIResponse<
      Array<{
        order_id: string;
        symbol: string;
        create_time: number;
        side: 'buy' | 'sell';
        order_mode: 'spot' | 'iso_margin';
        type: 'limit' | 'market' | 'limit_maker' | 'ioc';
        price: string;
        price_avg: string;
        size: string;
        notional: string;
        filled_notional: string;
        filled_size: string;
        status: string;
        client_order_id?: string;
      }>
    >
  > {
    return this.get('spot/v4/query/history-orders', params);
  }

  getV4QueryTrades(params: {
    symbol: string;
    order_mode?: 'spot' | 'iso_margin' | 'all';
    N?: number;
    start_time?: number;
    end_time?: number;
    order_id?: string;
  }): Promise<
    APIResponse<
      Array<{
        detail_id: string;
        order_id: string;
        symbol: string;
        create_time: number;
        side: 'buy' | 'sell';
        order_mode: 'spot' | 'iso_margin';
        fees: string;
        fee_coin_name: string;
        notional: string;
        price_avg: string;
        size: string;
        exec_type: 'M' | 'T';
        client_order_id?: string;
      }>
    >
  > {
    return this.get('spot/v4/query/trades', params);
  }

  /**
   *
   * Margin Loan Endpoints (History versions)
   *
   **/

  postIsolatedMarginBorrow(params: {
    symbol: string;
    currency: string;
    amount: string;
  }): Promise<APIResponse<{ borrow_id: string }>> {
    return this.post('spot/v1/margin/isolated/borrow', params);
  }

  postIsolatedMarginRepay(params: {
    symbol: string;
    currency: string;
    amount: string;
  }): Promise<APIResponse<{ repay_id: string }>> {
    return this.post('spot/v1/margin/isolated/repay', params);
  }

  getIsolatedMarginBorrowRecord(params: {
    symbol: string;
    borrow_id?: string;
    start_time?: number;
    end_time?: number;
    N?: number;
  }): Promise<
    APIResponse<{
      records: Array<{
        borrow_id: string;
        symbol: string;
        currency: string;
        borrow_amount: string;
        daily_interest: string;
        hourly_interest: string;
        interest_amount: string;
        create_time: number;
      }>;
    }>
  > {
    return this.get('spot/v1/margin/isolated/borrow_record', params);
  }

  getIsolatedMarginRepayRecord(params: {
    symbol: string;
    repay_id?: string;
    currency?: string;
    start_time?: number;
    end_time?: number;
    N?: number;
  }): Promise<
    APIResponse<{
      records: Array<{
        repay_id: string;
        repay_time: number;
        symbol: string;
        currency: string;
        repaid_amount: string;
        repaid_principal: string;
        repaid_interest: string;
      }>;
    }>
  > {
    return this.get('spot/v1/margin/isolated/repay_record', params);
  }

  getIsolatedMarginPairs(params?: { symbol?: string }): Promise<
    APIResponse<{
      symbols: Array<{
        symbol: string;
        max_leverage: string;
        symbol_enabled: boolean;
        base: {
          currency: string;
          daily_interest: string;
          hourly_interest: string;
          max_borrow_amount: string;
          min_borrow_amount: string;
          borrowable_amount: string;
        };
        quote: {
          currency: string;
          daily_interest: string;
          hourly_interest: string;
          max_borrow_amount: string;
          min_borrow_amount: string;
          borrowable_amount: string;
        };
      }>;
    }>
  > {
    return this.get('spot/v1/margin/isolated/pairs', params);
  }

  /**
   *
   * Subaccount Endpoints
   *
   **/

  postSubToMain(params: {
    requestNo: string;
    amount: string;
    currency: string;
    subAccount: string;
  }): Promise<APIResponse<{}>> {
    return this.post('account/sub-account/main/v1/sub-to-main', params);
  }

  postSubToMainSub(params: {
    requestNo: string;
    amount: string;
    currency: string;
  }): Promise<APIResponse<{}>> {
    return this.post('account/sub-account/sub/v1/sub-to-main', params);
  }

  postMainToSub(params: {
    requestNo: string;
    amount: string;
    currency: string;
    subAccount: string;
  }): Promise<APIResponse<{}>> {
    return this.post('account/sub-account/main/v1/main-to-sub', params);
  }

  postSubToSubMain(params: {
    requestNo: string;
    amount: string;
    currency: string;
    fromAccount: string;
    toAccount: string;
  }): Promise<APIResponse<{}>> {
    return this.post('account/sub-account/main/v1/sub-to-sub', params);
  }

  postSubToSubSub(params: {
    requestNo: string;
    amount: string;
    currency: string;
    subAccount: string;
  }): Promise<APIResponse<{}>> {
    return this.post('account/sub-account/sub/v1/sub-to-sub', params);
  }

  getSubAccountTransferHistory(params: {
    moveType: 'spot to spot';
    accountName?: string;
    N: number;
  }): Promise<
    APIResponse<{
      total: number;
      historyList: Array<{
        fromAccount: string;
        fromWalletType: 'spot';
        toAccount: string;
        toWalletType: 'spot';
        currency: string;
        amount: string;
        submissionTime: number;
      }>;
    }>
  > {
    return this.get('account/sub-account/main/v1/transfer-list', params);
  }

  getTransferHistory(params: { moveType: 'spot to spot'; N: number }): Promise<
    APIResponse<{
      total: number;
      historyList: Array<{
        fromAccount: string;
        fromWalletType: 'spot';
        toAccount: string;
        toWalletType: 'spot';
        currency: string;
        amount: string;
        submissionTime: number;
      }>;
    }>
  > {
    return this.get('account/sub-account/v1/transfer-history', params);
  }

  getMainWallet(params?: { subAccount?: string; currency?: string }): Promise<
    APIResponse<{
      wallet: Array<{
        currency: string;
        name: string;
        available: string;
        frozen: string;
      }>;
    }>
  > {
    return this.get('account/sub-account/main/v1/wallet', params);
  }

  getSubaccountList(): Promise<
    APIResponse<{
      subAccountList: Array<{
        accountName: string;
        status: number;
      }>;
    }>
  > {
    return this.get('account/sub-account/main/v1/subaccount-list');
  }

  /**
   *
   * Rebate Endpoints
   *
   **/

  getBrokerRebate(
    params?: SpotBrokerRebateRequest,
  ): Promise<APIResponse<SpotBrokerRebateResult>> {
    return this.getPrivate('spot/v1/broker/rebate', params);
  }
}
